using System;
using System.ComponentModel.DataAnnotations;
using IDomainEntityId = ee.itcollege.carwash.kristjan.Contracts.Domain.IDomainEntityId;

namespace DAL.App.DTO
{
    public class ShopBuilding : IDomainEntityId
    {
        public Guid Id { get; set; }
        
        [Required]
        public string NameOfBuilding { get; set; } = default!;
        
        public int MaxHealth { get; set; } = default!;
        
        public int LevelOfBuilding { get; set; } = default!;
        
        
        // 1 => neutral building
        // 2 => attack building
        public int BuildingType { get; set; } = default!;
        
        public int? RangeOfBuilding { get; set; }
        
        public int? AttackDamage { get; set; }
        
        public int? AttackType { get; set; }

        public double? AttackSpeed { get; set; }
        
        public int Price { get; set; } = default!;
    }
}