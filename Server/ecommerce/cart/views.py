from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Product
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response


# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart = request.session.get('cart', {})

    if str(product_id) in cart:
        cart[str(product_id)]['quantity'] += 1
    else:
        cart[str(product_id)] = {
            'name':product.name,
            'price':product.price,
            'quantity': 1
        }
    request.session['cart'] = cart
    return Response({"message":"Item added to cart", "cart": cart},status=status.HTTP_200_OK)

        


