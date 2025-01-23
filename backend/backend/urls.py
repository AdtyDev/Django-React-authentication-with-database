from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    #linked our register
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    #linked ourr token for new user to sign them up
    path("api/token/", TokenObtainPairView.as_view(), name="get_tokens"),
    #linked to refresh token
    path ("api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    #linked all pre-built urls that needed
    path("api-auth/",include("rest_framework.urls")),
    #this connects the main urls to the one thats created in the api app
    path("api/", include("api.urls")),
]
