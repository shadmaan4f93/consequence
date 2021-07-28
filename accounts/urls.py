from rest_framework import routers
from django.urls import path
from .views import (
    Register,
    ObtainTokenPairView,
    UserViewSet,
    LogoutAndBlacklistRefreshTokenForUserView
)

router = routers.DefaultRouter()
router.register('user', UserViewSet, basename='user')

urlpatterns = router.urls
urlpatterns.append(path('login/', ObtainTokenPairView.as_view(), name='login'))
urlpatterns.append(path('register/', Register.as_view(), name='register'))
urlpatterns.append(path('logout/', LogoutAndBlacklistRefreshTokenForUserView.as_view(),    name='blacklist'))
