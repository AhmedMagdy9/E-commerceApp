import { urlGuardGuard } from './core/guards/authG/url-guard.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { ProductComponent } from './features/pages/product/product.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { NotFoundComponent } from './features/layout/not-found/not-found.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { ProductDetilsComponent } from './features/pages/product-detils/product-detils.component';
import { CheckOutComponent } from './features/pages/check-out/check-out.component';
import { ForgetpassComponent } from './features/pages/forgetPassword/forgetpass/forgetpass.component';
import { WishlistComponent } from './features/pages/wishlist/wishlist/wishlist.component';
import { AllorderComponent } from './features/pages/allorder/allorder.component';
import { ChangepassComponent } from './features/pages/changepass/changepass/changepass.component';


export const routes: Routes = [
    {path:"" , redirectTo:"home" , pathMatch:"full"},
    {path:"home" , component:HomeComponent , canActivate:[urlGuardGuard] , title:'home'},
    {path:"cart" , component:CartComponent , canActivate:[urlGuardGuard], title:'cart'},
    {path:"products" , component:ProductComponent , canActivate:[urlGuardGuard], title:'products'},
    {path:"Categories" , component:CategoriesComponent , canActivate:[urlGuardGuard], title:'Categories'},
    {path:"productdetils/:id" , component:ProductDetilsComponent , canActivate:[urlGuardGuard], title:'product Detils'} ,
    {path:"brands" , component:BrandsComponent , canActivate:[urlGuardGuard], title:'brands'} ,
    {path:"wishlist" , component:WishlistComponent , canActivate:[urlGuardGuard], title:'wish list'} ,
    {path:"checkOut/:cartID" , component:CheckOutComponent , canActivate:[urlGuardGuard], title:'checkOut'} ,
    {path:"allorders" , component:AllorderComponent , canActivate:[urlGuardGuard], title:'all order'} ,
    {path:"changepass" , component:ChangepassComponent , canActivate:[urlGuardGuard], title:'change password'} ,
    {path:"login" , component:LoginComponent, title:'login'},
    {path:"forgetpassword" , component:ForgetpassComponent, title:'forget password'},
    {path:"register" , component:RegisterComponent, title:'register'},
    {path:"**" , component:NotFoundComponent}
];




