import emailjs from "emailjs-com";
export async function sendEmailtoStudents(mailParams) {
  try {
    const resp = await emailjs.send(
      "service_30v0ikz",
      "template_fi2wf3k",
      mailParams,
      "il9QG9B7XFL3sfpV0"
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function sendEmailtoStaffs(mailParams) {
  try {
    const resp = await emailjs.send(
      "service_gv0rnxw",
      "template_89jk78h",
      mailParams,
      "il9QG9B7XFL3sfpV0"
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
