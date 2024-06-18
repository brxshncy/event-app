import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/events/:id",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
    "/sign-in(.*)",
    "/sign-up(.*)",
]);

export default clerkMiddleware((auth, request) => {
    // console.log("Request URL:", request.url);
    // const isPublic = isPublicRoute(request);
    // console.log("Is public route:", isPublic);
    if (!isPublicRoute(request)) {
        auth().protect();
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
