from django.contrib import admin
from .models import Jewelry, JewelryCategory, JewelryImage, Review

admin.site.register(Jewelry)
admin.site.register(JewelryCategory)
admin.site.register(JewelryImage)
admin.site.register(Review)