module.exports = {
    newId(idLength = 26) {
        const charset = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
        let id = '';

        for (let i = 0; i < idLength; i++) {
            const randomLetter = Math.floor(Math.random() * charset.length);
            id += charset.charAt(randomLetter);
        }

        return id;
    }
}