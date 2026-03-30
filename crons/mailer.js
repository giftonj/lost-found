const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendMatchEmail = async (lost, found) => {
    const fromAddress = "'FoundIt' <noreply@lost-found-269-onrender.com>";

    const URL = process.env.IMAGE_URL

    const foundImage = found.cover_image 
    ? `${URL}/uploads/postCovers/${found.cover_image}` 
    : null;

    const lostImage = lost.cover_image 
    ? `${URL}/uploads/postCovers/${lost.cover_image}` 
    : null;

    await transporter.sendMail({
        from: fromAddress,
        to: lost.user.email,
        subject: `We found a match for your lost item: ${lost.title}`,
        html: buildEmail({
            recepientName: lost.user.name,
            headline: 'Good news - someone may have found your item!',
            yourItem: lost.title,
            matchItem: found.title,
            matchDesc: found.description,
            matchImage: foundImage,
            contactEmail: found.user.email,
            contactName: found.user.name
        })
    });

    await transporter.sendMail({
        from: fromAddress,
        to: found.user.email,
        subject: `Your found item may belong to someone: ${found.title}`,
        html: buildEmail({
            recepientName: found.user.name,
            headline: 'Good news - someone may have found your item!',
            yourItem: found.title,
            matchItem: lost.title,
            matchDesc: lost.description,
            matchImage: lostImage,
            contactEmail: lost.user.email,
            contactName: lost.user.name
        })
    });

    console.log(`Emailed ${lost.user.email} and ${found.user.email}`);
};

function buildEmail({ recepientName, headline, yourItem, matchItem, matchDesc, matchImage, contactEmail, contactName }) {
    return `
    <div style="font-family:sans-serif; max-width:520px; margin:auto; padding:24px;">
        <h2 style="color:#1d4ed8">FoundIt</h2>
        <p>Hi ${recepientName},</p>
        <p><strong>${headline}</strong></p>
        <div style="background:#f1f5f9; border-radius:8px; padding:16px; margin:16px 0;">
            <p><strong>Your item:</strong> ${yourItem}</p>
            <p><strong>Matched with:</strong> ${matchItem}</p>
            <p style="color:#64748b">${matchDesc}</p>
            ${matchImage
                ? `<img src="${matchImage}" style="max-width:100%; border-radius:6px; margin-top:8px;"/>`
                : ''
            }
        </div>
        <p>Please reach out to <strong>${contactName}</strong> at 
           <a href="mailto:${contactEmail}">${contactEmail}</a></p>
    </div>`;
}
