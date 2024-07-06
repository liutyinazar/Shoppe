from rest_framework import generics
from .models import Jewelry
from .serializers import JewelryListSerializer
from .permissions import IsAdminOrReadOnly

class JewelryListView(generics.ListCreateAPIView):
    queryset = Jewelry.objects.all()
    serializer_class = JewelryListSerializer
    permission_classes = [IsAdminOrReadOnly]

class JewelryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Jewelry.objects.all()
    serializer_class = JewelryListSerializer
    permission_classes = [IsAdminOrReadOnly]