using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contracts.BLL.App;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.App.EF;
using Domain.App;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using PublicApi.DTO.v1.Mappers;
using V1DTO=PublicApi.DTO.v1;

namespace WebApp.ApiControllers._1._0
{
    /// <summary>
    /// ShopBuildings Api Controller
    /// </summary>
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public class ShopBuildingsController : ControllerBase
    {
        private readonly IAppBLL _bll;
        private readonly ShopBuildingMapper _mapper = new ShopBuildingMapper();

        public ShopBuildingsController(IAppBLL bll)
        {
            _bll = bll;
        }

        // GET: api/ShopBuildings
        /// <summary>
        /// Get all ShopBuildings
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<PublicApi.DTO.v1.ShopBuilding>>> GetShopBuildings()
        {
            return Ok((await _bll.ShopBuildings.GetAllAsync()).Select(e => _mapper.Map(e)));
        }

        // GET: api/ShopBuildings/5
        /// <summary>
        /// Get Specific ShopBuilding
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<PublicApi.DTO.v1.ShopBuilding>> GetShopBuilding(Guid id)
        {
            var shopBuilding= await _bll.ShopBuildings.FirstOrDefaultAsync(id);

            if (shopBuilding== null)
            {
                return NotFound(new V1DTO.MessageDTO("ShopBuilding not found"));
            }

            return Ok(_mapper.Map(shopBuilding));
        }

        // PUT: api/ShopBuildings/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /// <summary>
        /// Update Camapign, only for admins
        /// </summary>
        /// <param name="id"></param>
        /// <param name="shopBuilding"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Produces("application/json")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(V1DTO.MessageDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(V1DTO.MessageDTO))]
        public async Task<IActionResult> PutShopBuilding(Guid id, V1DTO.ShopBuilding shopBuilding)
        {
            if (id != shopBuilding.Id)
            {
                return BadRequest(new V1DTO.MessageDTO("id and ShopBuilding.id do not match"));
            }

            await _bll.ShopBuildings.UpdateAsync(_mapper.Map(shopBuilding));
            await _bll.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/ShopBuildings
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /// <summary>
        /// Create new ShopBuilding. only for admins
        /// </summary>
        /// <param name="shopBuilding"></param>
        /// <returns></returns>
        [HttpPost]
        [Produces("application/json")]
        [Consumes("application/json")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(V1DTO.ShopBuilding))]
        public async Task<ActionResult<ShopBuilding>> PostShopBuilding(V1DTO.ShopBuilding shopBuilding)
        {
            var bllEntity = _mapper.Map(shopBuilding);
            _bll.ShopBuildings.Add(bllEntity);
            await _bll.SaveChangesAsync();
            shopBuilding.Id = bllEntity.Id;

            return CreatedAtAction("GetShopBuilding",
                new {id = shopBuilding.Id, version = HttpContext.GetRequestedApiVersion()?.ToString() ?? "0"},
                shopBuilding);
        }

        // DELETE: api/ShopBuildings/5
        /// <summary>
        /// Delete ShopBuilding, only for admins
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Produces("application/json")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        public async Task<ActionResult<ShopBuilding>> DeleteShopBuilding(Guid id)
        {
            var shopBuilding= await _bll.ShopBuildings.FirstOrDefaultAsync(id);
            if (shopBuilding== null)
            {
                return NotFound(new V1DTO.MessageDTO("ShopBuilding not found"));
            }

            await _bll.ShopBuildings.RemoveAsync(shopBuilding);
            await _bll.SaveChangesAsync();

            return StatusCode(204);
        }
    }
}
