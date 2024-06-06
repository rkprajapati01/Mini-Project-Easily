import nodeMailer from 'nodemailer';

async function sendNotification(applicant, job) {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'programmerrajat45@gmail.com',
            pass: 'vfwvmygqaczkidng'
        }
    })

    const mailOption = {
        from: 'programmerrajat45@gmail.com',
        to: applicant.email,
        subject: `Easily Update | Application Success`, // Email subject

        // Email body
        text: `Dear ${applicant.name},
        This email is to inform you that your job application for ${job.companyName} has been received and will be forwarded to the company we will keep you posted about your candidature.
 Stay tuned for updates on your application status. In the meantime, keep honing your skills and preparing for the next steps.
 Best Regards 
 ${job.companyName}`,
    };


    try {
        const result = await transporter.sendMail(mailOption);
        console.log('Mail sent successfully');
    } catch (err) {
        console.log('Sending mail failled due to: ' + err);
    }


}

export { sendNotification };