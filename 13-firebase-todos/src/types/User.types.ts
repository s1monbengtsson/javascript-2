export type LoginCredentials = {
    email: string
    password: string

}

export type SignUpCredentials = {
    email: string
    password: string
    passwordConfirm: string
}

export type ResetPassword = Omit<LoginCredentials, "password">

export type UpdateProfileFormData = {
	email: string
    displayName: string
    photoFile: FileList
    password: string
    passwordConfirm: string
}

