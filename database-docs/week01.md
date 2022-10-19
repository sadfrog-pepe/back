# 01주차 DB 설계
![01주차 ERD](./img/01주차 ERD.png)
### Users 테이블
- id : PK
- email : UQ. NN
- password : NN (bcrypt를 통한 보안 필요)
- gender : 
- height : 
- weight : 
- phone : XXX-XXXX-XXX의 형식
- consent_marketing : NN
- oauth_id : 
- platform_id : NN, FK(Platform 테이블)
- created_at : NN, default(생성 시의 now())
- updated_at : NN, default(생성 시의 now())
- deleted_at : default(null)


### Platform 테이블
- id : PK
- name : NN
