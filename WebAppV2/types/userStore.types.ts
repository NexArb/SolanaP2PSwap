export type ModalState = {
  showModal: boolean
  toggleModal: () => void
}

export type User = {
  name?: string
  email: string
  password: string
}

export type UserState = {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  error: string | null
}
