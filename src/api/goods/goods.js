import service from "@/axios.js";
import {queryUrl} from "@/composables/utill.js";

export function goodsList(page,limit=10,query={}) {
      let q = queryUrl(query);
      let is = q ? '&':'?';
      return service.get(`/admin/goods/${page}/list${q}${is}limit=${limit}`);
}

export function createGoods(data) {
      const min= 100000000; // 1억
      const max= 1000000000; // 10억
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      data.item_number = randomNumber;
      if(data.type === "二手商品"){
          // 1. 파일 추가 (여러 개 가능)
          const formData = new FormData();
          data.used_img.forEach((file) => {
              formData.append('used_img', file.raw)  // 키: 'files' (배열)
          })

          data.used_banner.forEach((file) => {
              formData.append('used_banner[]', file.raw)  // 키: 'files' (배열)
          })

          formData.append('category_id', data.category_id);
          formData.append('sideCategory_id', data.sideCategory_id);
          formData.append('model', data.model);
          formData.append('item_number', data.item_number);
          formData.append('service', data.service);
          formData.append('label', data.label);
          formData.append('label_color', data.label_color);
          formData.append('type', data.type);
          formData.append('title', data.title);
          formData.append('title1', data.title1);
          formData.append('banner', data.banner);
          formData.append('content', data.content);
          formData.append('price', data.price);
          formData.append('price1', data.price1);
          formData.append('price2', data.price2);
          formData.append('price3', data.price3);
          formData.append('color', data.color);
          formData.append('storage', data.storage);
          formData.append('status', data.status);
          formData.append('delivery', data.delivery);
          formData.append('video_link', data.video_link);
          formData.append('video_title', data.video_title);
          formData.append('used_img', data.used_img);
          formData.append('used_banner', data.used_banner);
          formData.append('order', data.order);
          formData.append('spec_id', data.spec_id);
          formData.append('phone_detail', data.phone_detail);
          formData.append('isShop', data.isShop);
          formData.append('goodsType', 'old');

          return service.post(`admin/goods/create`,formData,{
              headers: {
                  'Content-Type': 'multipart/form-data'
              }});
      }else{
          return service.post(`admin/goods/create`,data);
      }
}

export function updateGoods(id,data) {

    if(data.type === "二手商品"){
        // 1. 파일 추가 (여러 개 가능)
        const formData = new FormData();
        data.used_img.forEach((file) => {
            if(file.isExisting){
                formData.append('originalImg', JSON.stringify(file))  // 키: 'files' (배열)
            }else{
                formData.append('used_img', file.raw)  // 키: 'files' (배열)
            }
        })

        data.used_banner.forEach((file) => {
            if(file.isExisting){
                console.log(JSON.stringify(file));
                formData.append('originalBanner[]', JSON.stringify(file))  // 키: 'files' (배열)
            }else{
                formData.append('used_banner[]', file.raw)  // 키: 'files' (배열)
            }
        })
        formData.append('id',id);
        formData.append('category_id', data.category_id);
        formData.append('sideCategory_id', data.sideCategory_id);
        formData.append('model', data.model);
        formData.append('item_number', data.item_number);
        formData.append('service', data.service);
        formData.append('label', data.label);
        formData.append('label_color', data.label_color);
        formData.append('type', data.type);
        formData.append('title', data.title);
        formData.append('title1', data.title1);
        formData.append('banner', data.banner);
        formData.append('content', data.content);
        formData.append('price', data.price);
        formData.append('price1', data.price1);
        formData.append('price2', data.price2);
        formData.append('price3', data.price3);
        formData.append('color', data.color);
        formData.append('storage', data.storage);
        formData.append('status', data.status);
        formData.append('delivery', data.delivery);
        formData.append('video_link', data.video_link);
        formData.append('video_title', data.video_title);
        formData.append('order', data.order);
        formData.append('spec_id', data.spec_id);
        formData.append('phone_detail', data.phone_detail);
        formData.append('isShop', data.isShop);
        formData.append('goodsType', 'old');

        return service.post(`admin/goods/update`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }});
    }else{
        data.id = id;
        return service.post(`admin/goods/update`,data);
    }
}

export function deleteGoods(id){
    return service.post(`admin/goods/${id}/delete`);
}

export function deleteAll(id){
    return service.post(`admin/goods/deleteAll`,{ids:id});
}

export function updateStatus(id,status){
    return service.post(`admin/goods/${id}/updateStatus`, {status:status});
}

export function updateStatusAll(id,status){
    return service.post(`admin/goods/updateStatusAll`,{ids:id,status:status});
}

export function updateBanners(id,banner){
    return service.post(`admin/goods/${id}/banner`,{banner:banner});
}
export function updateContents(id,content){
    content = JSON.stringify(content);
    return service.post(`admin/goods/${id}/updateContent`,{content:content});
}

export function checkGoodsList(page,limit=10,query={}){
    let q = queryUrl(query);
    let is = q ? '&':'?';
    return service.get(`/admin/goods/checkList/${page}/list${q}${is}limit=${limit}`);
}