from django.urls import path
from django.contrib import admin
from jewelry.views import JewelryListView, JewelryDetailView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("jewelry/", JewelryListView.as_view(), name="jewelry-list"),
    path("jewelry/<int:pk>/", JewelryDetailView.as_view(), name="jewelry-detail"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
