from django.urls import path
from .views import get_products_by_category,get_all_products,create_product,delete_category,get_product,update_product,delete_product,create_category,search_products,list_categories




urlpatterns = [
    path('products/', get_all_products, name='get_all_products'),
    path('products/create/', create_product, name='create_product'),
    path('products/<int:product_id>/', get_product, name='get_product'),
    path('products/update/<int:product_id>/', update_product, name='update_product'),
    path('products/delete/<int:product_id>/', delete_product, name='delete_product'),
    path('categories/',list_categories, name='get_categories'),
    path('categories/create/', create_category, name='created_category'),
     path('categories/delete/<int:category_id>/', delete_category, name='delete_category'),
    # path('categories/<int:category_id>/', category_detail, name='category_detail'),
    path('products/search/', search_products, name='search_products'),
    path('categories/get_products_by_category/', get_products_by_category, name='get_products_by_category'),
         
]