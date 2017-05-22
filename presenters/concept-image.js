'use strict';
const conceptTypeImages = {
	Brand: 'http://com.ft.imagepublish.prod.s3.amazonaws.com/cca52406-bda0-11e5-9fdb-87b8d15baec2',
	Organisation: 'http://com.ft.imagepublish.prod.s3.amazonaws.com/cca52406-bda0-11e5-9fdb-87b8d15baec2',
	Person: 'http://com.ft.imagepublish.prod.s3.amazonaws.com/cca52406-bda0-11e5-9fdb-87b8d15baec2',
	Location: 'http://com.ft.imagepublish.prod.s3.amazonaws.com/cca52406-bda0-11e5-9fdb-87b8d15baec2',
	SpecialReport: 'http://com.ft.imagepublish.prod.s3.amazonaws.com/cca52406-bda0-11e5-9fdb-87b8d15baec2',
	Topic: 'http://com.ft.imagepublish.prod.s3.amazonaws.com/cca52406-bda0-11e5-9fdb-87b8d15baec2',
	'default': 'http://com.ft.imagepublish.prod.s3.amazonaws.com/cca52406-bda0-11e5-9fdb-87b8d15baec2'
};

const getShortConceptType = (directType) => directType.substring(directType.lastIndexOf('/') + 1);

/**
* @param {String} directType name of concept type e.g. http://www.ft.com/ontology/product/Brand
* @param {Object} items list of article items
**/
class ConceptImagePresenter {
	constructor (data) {
		this.data = data;
	}
	get imageUrl () {
		if (!this.data || !this.data.items) {
			return conceptTypeImages.default;
		}
		const findItemImage = this.data.items.find( item => {
			return ((item.primaryImage && item.primaryImage.rawSrc)
				|| (item.mainImage && (item.mainImage.url || item.mainImage.rawSrc)))
				&& !item.isPodcast;
		});

		const conceptImage = findItemImage
			&& ((findItemImage.primaryImage && findItemImage.primaryImage.rawSrc)
			|| findItemImage.mainImage.url || findItemImage.mainImage.rawSrc);

		return conceptImage || conceptTypeImages[getShortConceptType(this.data.directType)] || conceptTypeImages.default;
	}
}

module.exports = ConceptImagePresenter;
