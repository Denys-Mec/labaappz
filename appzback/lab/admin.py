from django.contrib import admin
from .models import *

class MessageModelAdmin(admin.ModelAdmin):
    # list_filter = [
    #      "first_boolean_field",
    #      "second_bollean_field",
    #      "third_boolean_field"
    # ]
    # search_fields = (
    #     "user",
    # )
    list_filter = [
        ("user", admin.RelatedOnlyFieldListFilter),
    ]

admin.site.register(BotMessage, MessageModelAdmin)
admin.site.register(Guide)
admin.site.register(Tooltipe)
admin.site.register(Section)
admin.site.register(Topic)
admin.site.register(Documentation)
admin.site.register(BotAnswersListItem)