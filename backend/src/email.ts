import { AttachmentData } from '@sendgrid/helpers/classes/attachment';
import * as emailService from '@sendgrid/mail';
import * as fs from 'fs';

emailService.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendMail(email: string | Array<string>, subject: string, html: string, text: string, attachments?: Array<AttachmentData>) {
    let emails = Array.isArray(email) ? email : [email];
    return new Promise((resolve, reject) => {
        attachments = attachments || [];
        attachments.forEach(async (a) => a.content = fs.readFileSync(a.content).toString("base64"));
        emails.forEach(async (to) => {
            emailService.send(
                {
                    to: to,
                    from: process.env.EMAIL_NO_REPLY,
                    subject,
                    text,
                    html,
                    attachments
                }
            ).then(resolve).catch(reject);
        });
    });
}

// sendMail(['viorelfilip@outlook.com', 'viorelfilip+1@outlook.com'],
//     'Test',
//     { html: '<p>Salut, vezi atasamentul!<p>', text: 'ole' },
//     [
//         {
//             content: './Asigurare MM-12-ZRJ.pdf', filename: 'your-solution-info.pdf'
//         }
//     ]
// );
