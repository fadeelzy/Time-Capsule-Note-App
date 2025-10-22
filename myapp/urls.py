from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing, name="landing"),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('dashboard/', views.dashboard, name="dashboard"),
    path('add_note/', views.add_note, name="add-note"),
    path('notes/<int:note_id>/', views.note_details, name='note_details'),
    path('logout/', views.logout_view, name='logout'),
]
