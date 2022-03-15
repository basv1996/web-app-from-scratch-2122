export const product = (response) => {
    const product = {
    name: response.product.product_name,
    brand: response.product.brand_owner,
    kcal100gram: response.product.nutriments['energy-kcal_100g'],
    carbsPer100gram: response.product.nutriments['carbohydrates_100g'],
    sugarspercarbs: response.product.nutriments['sugars_100g'],
    fatPer100gram: response.product.nutriments['fat_100g'],
    proteinsPer100gram: response.product.nutriments['proteins_100g'],
    nutriScore: response.product.nutriscore_grade,
    novaGroup: response.product.nova_group,
                        
    nutriments: response.product.nutriments,
    img: response.product.image_front_url
    }
}