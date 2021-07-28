from django.urls import path

from .views import (
    Register,
    ObtainTokenPairView,
    LogoutAndBlacklistRefreshTokenForUserView
)

urlpatterns = [
    path('login/', ObtainTokenPairView.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path('logout/', LogoutAndBlacklistRefreshTokenForUserView.as_view(),    name='blacklist'),
]