﻿using AutoMapper;
 using ee.itcollege.carwash.kristjan.DAL.Base.Mappers;
 using PublicApi.DTO.v1;

 namespace DAL.App.EF.Mappers
{
    public class DALMapper<TLeftObject, TRightObject> : BaseMapper<TLeftObject, TRightObject>
        where TRightObject : class?, new()
        where TLeftObject : class?, new()
    {
        public DALMapper() : base()
        { 
            // add more mappings
            MapperConfigurationExpression.CreateMap<Domain.App.Identity.AppUser, DAL.App.DTO.Identity.AppUser>();
            MapperConfigurationExpression.CreateMap<Domain.App.HunterBase, DAL.App.DTO.HunterBase>();
            
            MapperConfigurationExpression.CreateMap<Domain.App.Hero, DAL.App.DTO.Hero>();
            MapperConfigurationExpression.CreateMap<DAL.App.DTO.Hero, Domain.App.Hero>();

            
            MapperConfigurationExpression.CreateMap<Domain.App.Building, DAL.App.DTO.Building>();
            
            Mapper = new Mapper(new MapperConfiguration(MapperConfigurationExpression));
        }
    }
}