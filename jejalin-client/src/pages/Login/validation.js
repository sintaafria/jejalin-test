const rules = {
    email: {
        required: {value: true, message: 'Email harus diisi.'},
        maxlength: {value: true, message: 'Panjang email maksimal 225 karakter'},
        pattern: {value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/, message: 'Email tidak valid'}
    },
    
    password: {
        required: {value: true, message: 'Password harus diisi.'},
        maxlength: {value: true, message: 'Panjang password maksimal 225 karakter'},
    }
}

export {rules}