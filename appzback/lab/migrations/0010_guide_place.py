# Generated by Django 5.0 on 2023-12-13 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lab', '0009_tooltipe_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='guide',
            name='place',
            field=models.CharField(default='main', max_length=250, null=True),
        ),
    ]
