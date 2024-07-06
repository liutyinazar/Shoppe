from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class JewelryCategory(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Jewelry(models.Model):
    title = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    category = models.ForeignKey(JewelryCategory, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    discount = models.IntegerField(default=0, validators=[MaxValueValidator(100)])
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class JewelryImage(models.Model):
    jewelry = models.ForeignKey(
        Jewelry, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="jewelry_images/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.jewelry.title}"

class Review(models.Model):
    jewelry = models.ForeignKey(Jewelry, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.jewelry.title} by {self.id}"