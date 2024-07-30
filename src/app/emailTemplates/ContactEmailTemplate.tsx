import React from 'react'
export const ContactEmailTemplate = (name: string, email: string, message: string, subject: string, reason: string) => {
    return (
        `<div>
    <h1>${subject}</h1>
    <h1>${message}</h1>
    <h1>${name}</h1>
    <h1>${email}</h1>
    <h1>${reason}</h1>
    </div>
    `
    )
}
