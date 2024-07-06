from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Дозволяє доступ тільки для залогінених адміністраторів для методів POST, PUT та DELETE.
    Для GET-запитів доступний для всіх (тобто для перегляду списків та деталей).
    """

    def has_permission(self, request, view):
        # Дозволяє GET-запити для всіх користувачів
        if request.method in permissions.SAFE_METHODS:
            return True

        # Дозволяє POST, PUT та DELETE-запити тільки для залогінених адміністраторів
        return request.user.is_authenticated and request.user.is_staff
