using System;
using System.ComponentModel.DataAnnotations;
using carwash.kristjan.Contracts.Domain;

namespace PublicApi.DTO.v1
{
    public class Hero : IDomainEntityId
    {
        [Required]
        public string NameOfHero { get; set; } = default!;
        
        public int MaxHealth { get; set; } = default!;
        
        public int AttackDamage { get; set; } = default!;

        public int LevelOfHero { get; set; } = default!;
      
        public Guid? HunterBaseId { get; set; }
        public HunterBase? HunterBase { get; set; }
        
        public Guid Id { get; set; }
    }
}