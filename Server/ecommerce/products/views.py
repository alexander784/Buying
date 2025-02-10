from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializer import ProductSerializer
from .models import Product


# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTP_200_OK)
