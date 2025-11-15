from django.urls import path
from .views import get_products, get_product_detail


urlpatterns = [
    path('products/',get_products, name="products"),     
    path('product/<int:pk>/', get_product_detail, name="product-detail"),   
]

