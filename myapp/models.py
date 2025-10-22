from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    title = models.CharField(max_length=200)
    content = models.TextField()
    release_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def is_released(self):
        """Check if the note’s release date has passed."""
        return timezone.now() >= self.release_date

    @property
    def time_remaining(self):
        """Human-readable time remaining until release."""
        now = timezone.now()
        if self.release_date <= now:
            return "Unlocked"
        delta = self.release_date - now
        days = delta.days
        hours, remainder = divmod(delta.seconds, 3600)
        minutes, _ = divmod(remainder, 60)
        return f"{days}d {hours}h {minutes}m"

    @property
    def status(self):
        """Returns a friendly status string for templates."""
        return "Unlocked" if self.is_released() else "Locked"

    def __str__(self):
        return f"{self.title} - {self.user.username}"