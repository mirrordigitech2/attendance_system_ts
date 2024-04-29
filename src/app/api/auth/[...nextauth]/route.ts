import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'
// import { options } from './options'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
