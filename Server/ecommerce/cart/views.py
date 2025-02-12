from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Product,CartItem
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver



# Create your views here.


# Session based cart got guest

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

# Logged in user
@receiver(user_logged_in)
def transfer_cart_to_db(sender, request, user, **kwargs):
    session_cart = request.session.get('cart', {})

    for product_id, item in session_cart.items():
        product = get_object_or_404(Product, id=product_id)
        cart_item, created = CartItem.objects.get_or_create(
            user=user, product=product,
            defaults={"quantity":item['quantity']}
        )
        if not created:
            cart_item.quantity += item["quantity"]
            cart_item.save()

    request.session['cart'] = {}

@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart(request):
    if request.user.is_authenticated:
        cart_items = CartItem.objects.filter(user=request.user)
        cart_data = [{"name": item.product.name, "quantity":item.quantity, "price": item.price}
                     for item in cart_items]
    else:
        cart_data - list(request.session.get('cart',{}).values())
        return Response({"cart": cart_data}, status=status.HTTP_200_OK)
    


        


