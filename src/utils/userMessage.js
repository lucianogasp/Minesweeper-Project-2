export async function userMessage(message) {

  await delay(0);
  alert(message);
}

function delay(ms) {
  return new Promise( resolve => {
    setTimeout(resolve, ms);
  });
}