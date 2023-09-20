export { default } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//         // console.log(token);
//         // console.log(req);
        
        
//       // `/admin` requires admin role
//     //   if (req.nextUrl.pathname === "/home") {
//     //     return token?.user ? true : false;
//     //   }
//       // `/me` only requires the user to be logged in
//       const stats = token.email ? true : false
//       console.log(stats);
      
//       return stats;
//     },
//   },
// })

export const config = { matcher: ["/"] }