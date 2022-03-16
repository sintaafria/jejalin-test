const rules = {
    username: {
        required: {value: true, message: 'username lengkap harus diisi.'},
        maxlength: {value: true, message: 'Panjang nama lengkap maksimal 225 karakter'},
    },
    email: {
        required: {value: true, message: 'Email harus diisi.'},
        maxlength: {value: true, message: 'Panjang email maksimal 225 karakter'},
        pattern: {value: /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/, message: 'Email tidak valid'}
    },
    first_name: {
        required: {value: true, message: 'Nama depan lengkap harus diisi.'},
        maxlength: {value: true, message: 'Panjang nama lengkap maksimal 225 karakter'},
    },
    last_name: {
        required: {value: true, message: 'Nama belakang lengkap harus diisi.'},
        maxlength: {value: true, message: 'Panjang nama lengkap maksimal 225 karakter'},
    },
    password: {
        required: {value: true, message: 'Password harus diisi.'},
        maxlength: {value: true, message: 'Panjang password maksimal 225 karakter'},
    },

    password_confirmation: {
        required: {value: true, message: 'Konfirmasi password harus diisi'},
    }
}

export {rules}