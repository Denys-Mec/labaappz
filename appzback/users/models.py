from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
	image = models.ImageField(upload_to ='uploads/', null=True)
	full_name = models.CharField(max_length=255, default="Іванов Іван Іванович")
	Doctor = 'Doctor'
	#Patient = 'Patient'
	Admin = 'Admin'

	Role = (
		(Admin, Admin),
		(Doctor, Doctor),
		#(Patient, Patient),
	)
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	role = models.CharField(max_length=255, choices=Role, default=Doctor)#Patient)

	is_finished_guide = models.BooleanField(default=False)
	def __str__(self):
		return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()