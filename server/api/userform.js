export default defineEventHandler(async (event) => {
    const payload = await readBody(event);
    const response = await fetch('https://api.telegram.org/bot'+process.env.TELEGRAM_TOKEN+'/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: `
Надійшла нова заявка:
--------------------
Ім'я: ${payload.username}
Телефон: ${payload.phone}
Замовлення: ${payload.description}`
        })
    });

    return response;

    // const users = [
    //   { id: 1, name: 'Alice' },
    //   { id: 2, name: 'Bob' },
    // ];
  
    // return users;
});