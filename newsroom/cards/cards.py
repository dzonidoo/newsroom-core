import newsroom


class CardsResource(newsroom.Resource):
    """
    Cards schema
    """

    schema = {
        "label": {"type": "string", "unique": True, "required": True},
        "type": {
            "type": "string",
            "required": True,
            "nullable": False,
            "allowed": [
                "6-text-only",
                "4-picture-text",
                "4-text-only",
                "4-media-gallery",
                "4-photo-gallery",
                "1x1-top-news",
                "2x2-top-news",
                "3-text-only",
                "3-picture-text",
                "2x2-events",
                "6-navigation-row",
            ],
        },
        "config": {
            "type": "dict",
        },
        "order": {"type": "integer", "nullable": True},
        # to indicate that the card belongs to which dashboard it belongs
        "dashboard": {
            "type": "string",
            "required": True,
        },
        "original_creator": newsroom.Resource.rel("users"),
        "version_creator": newsroom.Resource.rel("users"),
    }
    datasource = {"source": "cards", "default_sort": [("order", 1), ("label", 1)]}
    item_methods = ["GET", "PATCH", "DELETE"]
    resource_methods = ["GET", "POST"]


class CardsService(newsroom.Service):
    pass
