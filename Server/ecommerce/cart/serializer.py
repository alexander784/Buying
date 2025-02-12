from rest_framework import serializers
from .models import CartItem
from products.models import Product
from products.serializer import ProductSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product', write_only=True)
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if 'product' in data and 'price' in data['product']:
            data['product']['price'] = float(data['product']['price'])  
        return data

    class Meta:
        model = CartItem
        fields = ['id', 'user', 'product', 'product_id', 'quantity']
        extra_kwargs = {
            'user': {'read_only': True}
        }
