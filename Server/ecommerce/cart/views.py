from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from urllib.parse import quote
from products.models import Product
from .models import CartItem
from urllib.parse import quote
from django.http import JsonResponse



# Create your views here.


# Session based cart got guest

@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)

    if request.user.is_authenticated:
        cart_item, created = CartItem.objects.get_or_create(
            user=request.user, product=product,
            defaults={"quantity": 1}
        )
        if not created:
            cart_item.quantity += 1
            cart_item.save()

        cart_items = CartItem.objects.filter(user=request.user)
        cart_data = [{"name": item.product.name, "quantity": item.quantity, "price": item.product.price}
                     for item in cart_items]

        return Response({"message": "Item added to cart", "cart": cart_data}, status=status.HTTP_200_OK)

    cart = request.session.get('cart', {})
    if str(product_id) in cart:
        cart[str(product_id)]['quantity'] += 1
    else:
        cart[str(product_id)] = {
            'name': product.name,
            'price': float(product.price),
            'quantity': 1
        }

    request.session['cart'] = cart
    request.session.modified = True

    return Response({"message": "Item added to cart", "cart": list(cart.values())}, status=status.HTTP_200_OK)


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
        cart_data = [{"id": item.product.id, "name": item.product.name, "quantity":item.quantity,
                       "price": item.product.price}
                     for item in cart_items]
    else:
        session_cart = request.session.get('cart', {})
        cart_data = [{"id": int(product_id), "name": item["name"], "quantity": item["quantity"], "price": item["price"]}
                     for product_id, item in session_cart.items()]
    return Response({"cart": cart_data}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def remove_from_cart(request, product_id):
    if request.user.is_authenticated:
        cart_item = get_object_or_404(CartItem, user=request.user,product_id=product_id)
        cart_item.delete()

    else:
        cart = request.session.get('cart', {})
        cart.pop(str(product_id), None)
        #Save session
        request.session['cart'] = cart

    return Response({'message': 'item removed from cart'}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def request_quote(request):
    if request.user.is_authenticated:
        cart_items = CartItem.objects.filter(user=request.user)
    else:
        session_cart = request.session.get('cart', {})
        cart_items = [
            {
                "id": int(product_id),
                "name": item["name"],
                "quantity": item["quantity"],
                "price": item["price"]
            }
            for product_id, item in session_cart.items()
        ]

    message = "Quote Request:\n\n"
    
    if request.user.is_authenticated:
        for item in cart_items:
            message += f"- {item.product.name} (Qty: {item.quantity})  - ${item.product.price}\n"

    else:
        for item in cart_items:
            message += f"- {item['name']} (Qty: {item['quantity']})  - ${item['price']}\n"

    message += '\nCan you provide the procing details? Thank you!'

    encoded_message = quote(message)

    whatsapp_number = '0796097131'

    whatsapp_link = f'https://wa.me/{whatsapp_number}?text={encoded_message}'

    return JsonResponse({"whatsapp_link": whatsapp_link}, status=status.HTTP_200_OK)



    



        


