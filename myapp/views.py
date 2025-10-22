from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from datetime import datetime
from .models import Note
# Create your views here.

def landing(request):
    return render(request, "landing.html")

# User Login

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f"Welcome back, {user.username}!")
            return redirect('dashboard')
        else:
            messages.error(request, "Invalid username or password.")
    return render(request, 'login.html')


# User Signup
def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        if password1 != password2:
            messages.error(request, "Passwords do not match.")
            return redirect('signup')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect('signup')

        user = User.objects.create_user(username=username, email=email, password=password1)
        login(request, user)
        messages.success(request, f"Welcome, {user.username}! Your account has been created.")
        return redirect('dashboard')

    return render(request, 'signup.html')


@login_required
def dashboard(request):
    """Display all notes for the logged-in user, with lock status overview."""
    notes = Note.objects.filter(user=request.user)

    # Current time for template reference
    current_time = timezone.now()

    # Classify notes by release status
    locked_notes = [note for note in notes if not note.is_released()]
    unlocked_notes = [note for note in notes if note.is_released()]

    context = {
        "notes": notes,
        "locked_notes_count": len(locked_notes),
        "unlocked_notes_count": len(unlocked_notes),
        "total_notes": notes.count(),
        "current_time": current_time,
    }
    return render(request, "dashboard.html", context)


@login_required
def add_note(request):
    if request.method == "POST":
        title = request.POST.get("title")
        content = request.POST.get("content")
        release_date = request.POST.get("releaseDate")
        release_time = request.POST.get("releaseTime")

        if not all([title, content, release_date, release_time]):
            messages.error(request, "Please fill in all fields.")
            return redirect("add_note")

        # Combine date and time into a single datetime object
        release_datetime = datetime.strptime(f"{release_date} {release_time}", "%Y-%m-%d %H:%M")

        # ✅ Ensure datetime is timezone-aware
        if timezone.is_naive(release_datetime):
            release_datetime = timezone.make_aware(release_datetime)

        # ✅ Compare safely with current time
        if release_datetime <= timezone.now():
            messages.error(request, "Release date must be in the future.")
            return redirect("add_note")

        # ✅ Save the note
        Note.objects.create(
            user=request.user,
            title=title,
            content=content,
            release_date=release_datetime,
        )

        messages.success(request, "Time capsule created successfully!")
        return redirect("dashboard")

    return render(request, "add-note.html")

@login_required
def note_details(request, note_id):
    """Display a single note’s detail — locked or unlocked depending on release date."""
    note = get_object_or_404(Note, id=note_id, user=request.user)

    context = {
        "note": note,
        "is_unlocked": note.is_released(),        
        "time_remaining": note.time_remaining,    
        "status": note.status,                    
    }
    return render(request, "note-details.html", context)

# Logout
def logout_view(request):
    auth_logout(request)
    return redirect('landing')

