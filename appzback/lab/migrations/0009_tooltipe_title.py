# Generated by Django 4.2.7 on 2023-12-12 23:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lab', '0008_conversation_botmessage_conversation_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='tooltipe',
            name='title',
            field=models.CharField(max_length=50, null=True),
        ),
    ]