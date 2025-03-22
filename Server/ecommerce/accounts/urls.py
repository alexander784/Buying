from django.urls import path
from .views import register_user,login_user,logout_user,get_user_details
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns = [
    path('register_user/',register_user, name='register_user'),
    path('login_user/',login_user, name='login'),
    path('logout_user/', logout_user, name='logout'),
    path('token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
    path('', get_user_details, name='user-details'),
]