from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import permissions
from .serializers import AccountSerializer, MyTokenObtainPairSerializer, AccountListSerializer

from .models import Account

class ObtainTokenPairView(TokenObtainPairView):
    permission_classes  =   (permissions.AllowAny,)
    serializer_class    =   MyTokenObtainPairSerializer

class Register(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer  = AccountSerializer( data = request.data , context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"email": serializer.data["email"]}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = AccountListSerializer

    def get_queryset(self):
        queryset = Account.objects.filter(uuid=self.request.user.uuid)
        return queryset

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = Account.objects.get(uuid=kwargs["pk"])
        if 'uuid' in request.data:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)