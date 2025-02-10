from django.urls import path
from .views import get_all_products,create_product


urlpatterns = [
    path('products/', get_all_products, name='get_all_products'),
    path('products/create/', create_product, name='create_product'),

         
]