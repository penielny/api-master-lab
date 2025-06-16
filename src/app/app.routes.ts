import { Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { PostInfoComponent } from './pages/post-info/post-info.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { protectedRouteGuard } from './gaurds/protected-route.guard';

export const routes: Routes = [
    {
        path: "",
        component: PostsComponent,
        pathMatch: "full",
    },
    {
        path: "post/:id",
        component: PostInfoComponent,
    },
    {
        path: "edit",
        component: EditPostComponent,
        canActivate:[protectedRouteGuard]
    },
    {
        path: "new",
        component: NewPostComponent,
         canActivate:[protectedRouteGuard]
    },

];
