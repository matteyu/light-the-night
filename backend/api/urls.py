from django.urls import path, include
from rest_framework_nested import routers

from api.views import (
    AccountViewSet,
)

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
