from django.urls import path
from .views import get_cart,add_to_cart,request_quote,remove_from_cart



urlpatterns = [
    path('cart/add/<int:product_id>/', add_to_cart, name="add_to_cart"),
    path('cart/', get_cart, name='get_cart'),
    path('cart/request_quote/', request_quote, name='request_quote'),
    path('cart/remove/<int:product_id>/', remove_from_cart, name='remove_from_cart'),
]